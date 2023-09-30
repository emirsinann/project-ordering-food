const { connect, sequelise } = require("../dbconfig");
const { objectCleaner } = require("../helpers/objectHelper");
const { Address } = require("../models/Adress");
const { User } = require("../models/User");
const { addressValidator } = require("../validators/addressValidator"); //kullanmadım öylesine yaptım.
const jwt = require("jsonwebtoken");

exports.AddressController = {
  async create(req, res) {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      const data = jwt.decode(token, process.env.SECRET);
      const user = await User.findByPk(data.id);

      if (user) {
        const address = await Address.create({
          userId: user.id,
          name: req.body.name,
          description: req.body.description,
          province: req.body.province,
          district: req.body.district,
        });

        if (address) {
          return res
            .status(201)
            .json({ message: "Address başarıyla oluşturuldu", address });
        }
      }

      return res
        .status(404)
        .json({ errors: { msg: "Adres eklenirken hata oluştu." } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: { msg: "Sunucu hatası." } });
    }
  },

  async update(req, res) {
    const body = objectCleaner(req.body); //object cleaner silmeye yarıyor.

    const address = await Address.update(body, {
      where: {
        addressId: req.body.id,
      },
    });

    res.send({ message: "Addres Degisikligi kaydedildi." });
  },

  async delete(req, res) {
    const token = req.headers["authorization"].split(" ")[1];
    const data = jwt.decode(token, process.env.SECRET);
    const user = await User.findByPk(data.id);
    const address = await Address.destroy({
      where: {
        addressId: req.body.id,
      },
    });
    return res.send({ message: "Addres basariyla silindi." });
  },

  async getAddress(req, res) {
    let data = jwt.decode(
      req.headers["authorization"].split(" ")[1],
      process.env.SECRET
    );
    const user = await User.findByPk(data.id);
    if (user.id) {
      try {
        const adreslerim = await Address.findAll({
          where: {
            userId: data.id,
          },
        });
        return res.status(200).json(adreslerim); //return res.status(200).json(orders);
      } catch (error) {
        return res
          .status(404)
          .json({ errors: { msg: "Adres eklenirken hata oluştu." } });
      }
    } else
      res
        .status(404)
        .json({ errors: { msg: "Addres girilirken hata oluştu" } });
  },
};
