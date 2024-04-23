'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "viajesegurocrc@gmail.com",
        pass: "ViajeSeguro_1"
    }
});

const InicioSesion = require('../models/login.model');

router.post('/signup', (req, res, next) => {

    InicioSesion.find({ correoElectronico: req.body.correo })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'El usuario ya existe '
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        let body = req.body;
                        let user = new InicioSesion({

                            correoElectronico: body.correo,
                            password: hash,
                            identificacion: body.identificacion
                        });
                        user
                            .save()
                            .then(result => {
                                let mailOptions = {
                                    from: "Viaje Seguro",
                                    to: body.correo,
                                    subject: `Le ofrecemos la bienvenida a Viaje Seguro, ${body.nombre}!`,
                                    text: `Gracias por registarte y convertirte en parte de ésta gran comunidad!\n
                                        Esperamos que saques buen provecho de los servicios que ofrecemos y que estos logren superar tus expectactivas!\n
                                        Ya puedes comenzar a utilizar tu cuenta, ${body.nombre}! El usuario de sistema es: ${body.correo}, y ante cualquier consulta, no dude en contactarnos.

                                        Saludos cordiales,

                                        Buhosapiens Developers.

                                        Contacto: buhosapiensdevs@gmail.com`
                                };

                                transporter.sendMail(mailOptions, function(error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log("El correo ha sido enviado correctamente." + info.response);
                                    }
                                });
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
            }
        })

});

// router.post('/signup', (req, res, next) => {
//     InicioSesion.find({ correoElectronico: req.body.correo })
//         .exec()
//         .then(user => {
//             if (user.length >= 1) {
//                 return res.status(409).json({
//                     message: 'El usuario ya existe '
//                 });
//             } else {
//                 let body = req.body;
//                 let user = new InicioSesion({
//                     correoElectronico: body.correo,
//                     password: body.password,
//                     identificacion: body.identificacion
//                 });
//                 user
//                     .save()
//                     .then(result => {
//                         let mailOptions = {
//                             from: "Viaje Seguro",
//                             to: body.correo,
//                             subject: `Le ofrecemos la bienvenida a Viaje Seguro, ${body.nombre}!`,
//                             text: `Gracias por registarte y convertirte en parte de ésta gran comunidad!\n
//                                         Esperamos que saques buen provecho de los servicios que ofrecemos y que estos logren superar tus expectactivas!\n
//                                         Ya puedes comenzar a utilizar tu cuenta, ${body.nombre}! El usuario de sistema es: ${body.correo}, y ante cualquier consulta, no dude en contactarnos.
//                                         Saludos cordiales,
//                                         Buhosapiens Developers.
//                                         Contacto: buhosapiensdevs@gmail.com`
//                         };
//                         transporter.sendMail(mailOptions, function(error, info) {
//                             if (error) {
//                                 console.log(error);
//                             } else {
//                                 console.log("El correo ha sido enviado correctamente." + info.response);
//                             }
//                         });
//                         console.log(result);
//                         res.status(201).json({
//                             message: 'User created'
//                         });
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         res.status(500).json({
//                             error: err
//                         });
//                     });
//             }
//         })
// });

// router.post('/signup', (req, res, next) => {
//     InicioSesion.find({ correoElectronico: req.body.correo })
//         .exec()
//         .then(user => {
//             if (user.length >= 1) {
//                 return res.status(409).json({
//                     message: 'El usuario ya existe '
//                 });
//             } else {
//                 let body = req.body;
//                 let user = new InicioSesion({
//                     correoElectronico: body.correo,
//                     password: body.password,
//                     identificacion: body.identificacion
//                 });
//                 user
//                     .save()
//                     .then(result => {
//                         let mailOptions = {
//                             from: "Viaje Seguro",
//                             to: body.correo,
//                             subject: `Le ofrecemos la bienvenida a Viaje Seguro, ${body.nombre}!`,
//                             text: `Gracias por registarte y convertirte en parte de ésta gran comunidad!\n
//                                         Esperamos que saques buen provecho de los servicios que ofrecemos y que estos logren superar tus expectactivas!\n
//                                         Ya puedes comenzar a utilizar tu cuenta, ${body.nombre}! El usuario de sistema es: ${body.correo}, y ante cualquier consulta, no dude en contactarnos.
//                                         Saludos cordiales,
//                                         Buhosapiens Developers.
//                                         Contacto: buhosapiensdevs@gmail.com`
//                         };
//                         transporter.sendMail(mailOptions, function(error, info) {
//                             if (error) {
//                                 console.log(error);
//                             } else {
//                                 console.log("El correo ha sido enviado correctamente." + info.response);
//                             }
//                         });
//                         console.log(result);
//                         res.status(201).json({
//                             message: 'User created'
//                         });
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         res.status(500).json({
//                             error: err
//                         });
//                     });
//             }
//         })
// });

// router.post('/login', (req, res) => {
//     let body = req.body
//     InicioSesion.find({ "correoElectronico": body.correo }, (err, correoUsuario) => {

//         if (err) {
//             console.log(err);
//         }

//         if (correoUsuario.length == 1) {
//             bcrypt.compare(body.password, correoUsuario[0]["password"], (err, result) => {
//                 if (err) {
//                     return res.json({
//                         mensaje: "Error" + err
//                     });
//                 } else if (result == true) {
//                     const token = jwt.sign({
//                             correoElectronico: correoUsuario[0]["correoElectronico"],
//                             userId: correoUsuario[0]["_id"]
//                         },
//                         process.env.JWT_KEY, {
//                             expiresIn: "1h"
//                         });
//                     return res.json({
//                         resultado: 'sesion',
//                         mensaje: 'Se inició la sesión correctamente',
//                         token: token,
//                         correoUsuario
//                     });
//                 } else {
//                     return res.json({
//                         resultado: "contraseña",
//                         mensaje: "El usuario o la contraseña no coinciden"
//                     });
//                 }
//             })

//         } else if (correoUsuario.length < 1) {
//             res.json({
//                 resultado: "sinRegistro",
//                 mensaje: "Aun no se ha registrado a la aplicación",
//             });
//         }
//     });
// });

router.post('/login', (req, res) => {
    let body = req.body
    InicioSesion.find({ "correoElectronico": body.correo }, (err, correoUsuario) => {
        if (err) {
            console.log(err);
        }
        if (correoUsuario.length == 1) {
            bcrypt.compare(body.password, correoUsuario[0]["password"], (err, result) => {
                if (err) {
                    return res.json({
                        mensaje: "Error" + err
                    });
                } else if (result == true) {
                    const token = jwt.sign({
                            correoElectronico: correoUsuario[0]["correoElectronico"],
                            userId: correoUsuario[0]["_id"]
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "1h"
                        });
                    return res.json({
                        resultado: 'sesion',
                        mensaje: 'Se inició la sesión correctamente',
                        token: token,
                        correoUsuario
                    });
                } else {
                    return res.json({
                        resultado: "contraseña",
                        mensaje: "El usuario o la contraseña no coinciden"
                    });
                }
            })
        } else if (correoUsuario.length < 1) {
            res.json({
                resultado: "sinRegistro",
                mensaje: "Aun no se ha registrado a la aplicación",
            });
        }
    });
});

// router.post('/login', (req, res) => {
//     let body = req.body
//     InicioSesion.find({ "correoElectronico": body.correo, "password": body.password }, (err, correoUsuario) => {
//         if (err) {
//             console.log(err);
//         }
//         if (correoUsuario.length == 1 && correoUsuario[0]["password"] === body.password) {
//             const token = jwt.sign({
//                     correoElectronico: correoUsuario[0]["correoElectronico"],
//                     userId: correoUsuario[0]["_id"],
//                     password: correoUsuario[0]["password"]
//                 },
//                 process.env.JWT_KEY, {
//                     expiresIn: "1h"
//                 });
//             return res.json({
//                 resultado: 'sesion',
//                 mensaje: 'Se inició la sesión correctamente',
//                 token: token,
//                 correoUsuario
//             });
//         } else if (correoUsuario.length < 1) {
//             res.json({
//                 resultado: "sinRegistro",
//                 mensaje: "Favor revisar los datos ingresados",
//             });
//         }
//     });
// });

router.get("/buscar-correo-usuario", (req, res) => {
    let identificacion = req.query.usuarioID;

    InicioSesion.findOne({ identificacion: identificacion }, (err, correoUsuario) => {
        if (err) {
            res.json({
                resultado: false,
                msj: "No se ha logrado encontrar el usuario buscado a causa del siguiente error:",
                error: err
            });
        } else {
            res.json({
                resultado: true,
                msj: "El usuario ha sido encontrado correctamente",
                correoUsuario: correoUsuario
            });
        }
    })
});


router.delete("/eliminar-correo", (req, res) => {
    let identificacion = req.query.identificacion;
    InicioSesion.deleteOne({ _id: identificacion }, (err) => {
        if (err) {
            res.json({
                resultado: false,
                msj: "No se ha podido eliminar el usuario debido al siguiente error: ",
                error: err
            });
        }
    })
});




module.exports = router;