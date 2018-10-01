new Vue({
  el: "#register-container",
  data: {
    name: "",
    college: "",
    regno: "",
    code: "",
    password: "",
    repassword: "",
    username: "",
    email: "",
    isManipal: false,
    pno: "",
    wpno: "",
    campamb: "",
    response: 0,
    phoneNos: false,
    mujerror: "",
    othererror: "",
    message: "",
    disabled: false
  },
  methods: {
    random_code: function() {
      var start = new Date().getTime();
      var end = start.toString(8).substr(10);
      var random = Math.random()
        .toString(36)
        .substr(10);
      var res = random.concat(end);

      return res;
    },
    validateOther() {
      var self = this;
      self.disabled = true;
      if (this.phoneNos) {
        this.wpno = this.pno;
      }
      if (
        this.college.toLowerCase() === "muj" ||
        this.college.toLowerCase() === "muj"
      ) {
        this.isManipal = true;
      }
      if (
        this.name == "" ||
        this.college == "" ||
        this.password == "" ||
        this.repassword == "" ||
        this.username == "" ||
        this.email == "" ||
        this.pno == "" ||
        this.wpno == ""
      ) {
        if (this.name == "") {
          alert("Name empty");
        } else if (this.college == "") {
          alert("College empty");
        } else if (this.password == "") {
          alert("Password empty");
        } else if (this.repassword == "") {
          alert("Password again empty");
        } else if (this.username == "") {
          alert("Username empty");
        } else if (this.email == "") {
          alert("Email empty");
        } else if (this.pno == "") {
          alert("Phone Number empty");
        } else {
          alert("Whatsapp Number empty");
        }
        return false;
      }
      if (this.password != this.repassword) {
        alert("Both passwords don't match.");
        return false;
      }
      return true;
    },
    registerOther() {
      var newCode = this.random_code();
      var result = this.validateOther();
      var uniqueCode = this.random_code();
      var self = this;
      if (!result) {
        return;
      }
      firebase
        .firestore()
        .collection("users")
        .where("username", "==", self.username)
        .get()
        .then(
          function(querySnapshot) {
            if (querySnapshot.size > 0) {
              alert(
                "Username already exists. Please try with another username."
              );
            } else {
              if (self.code != "") {
                firebase
                  .firestore()
                  .collection("campus_ambassadors")
                  .where("referralcode", "==", self.code)
                  .get()
                  .then(
                    function(querySnapshot) {
                      if (querySnapshot.size > 0) {
                        querySnapshot.forEach(function(doc) {
                          firebase
                            .auth()
                            .createUserWithEmailAndPassword(
                              self.email,
                              self.password
                            )
                            .then(
                              function(user) {
                                if (self.campamb) {
                                  firebase
                                    .firestore()
                                    .collection("campus_ambassadors")
                                    .doc(user.user.uid)
                                    .set({
                                      name: self.name,
                                      college: self.college,
                                      username: self.username,
                                      email: self.email,
                                      ucode: uniqueCode,
                                      pno: self.pno,
                                      wpno: self.wpno,
                                      uid: user.user.uid,
                                      sameNos: self.phoneNos,
                                      referred: true,
                                      referralcode: newCode
                                    })
                                    .catch(function(error) {
                                      alert(error.message);
                                    });
                                }
                                if (
                                  doc.data().users != undefined &&
                                  doc.data().users != null
                                ) {
                                  var usersArr = doc.data().users;
                                  if (!usersArr.includes(user.user.uid))
                                    usersArr.push(user.user.uid);
                                  firebase
                                    .firestore()
                                    .collection("campus_ambassadors")
                                    .doc(doc.id)
                                    .update({
                                      users: usersArr
                                    });
                                } else {
                                  var usersArr = [];
                                  usersArr.push(user.user.uid);
                                  firebase
                                    .firestore()
                                    .collection("campus_ambassadors")
                                    .doc(doc.id)
                                    .update({
                                      users: usersArr
                                    });
                                }
                                firebase
                                  .firestore()
                                  .collection("users")
                                  .doc(user.user.uid)
                                  .set({
                                    name: self.name,
                                    college: self.college,
                                    username: self.username,
                                    email: self.email,
                                    ucode: uniqueCode,
                                    pno: self.pno,
                                    wpno: self.wpno,
                                    uid: user.user.uid,
                                    isManipal: self.isManipal,
                                    sameNos: self.phoneNos,
                                    referred: true,
                                    referralcode: self.code,
                                    referredUid: doc.data().uid,
                                    campamb: self.campamb
                                  })
                                  .then(
                                    function() {
                                      console.log("Successful");
                                    },
                                    function(error) {
                                      console.log(error.message);
                                    }
                                  );
                                body = {
                                  email: self.email,
                                  message: self.message,
                                  name: self.name
                                };
                                fetch("/mail/checkMail.php", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify(body)
                                })
                                  .then(res => {
                                    return res.json();
                                  })
                                  .then(response => {
                                    if (response.code === 200) {
                                      self.mujerror = "We'll get back to you!";
                                    } else if (response.code === 405) {
                                      self.mujerror = "Fields cant be empty!";
                                    } else if (response.code === 406) {
                                      self.mujerror = "Invalid E-Mail";
                                    }
                                    window.location = "/eventregistrations";
                                  });
                              },
                              function(error) {
                                self.mujerror = error.message;
                              }
                            );
                        });
                      } else {
                        alert("Referral Code not valid.");
                      }
                    },
                    function(error) {
                      self.mujerror = error.message;
                      return;
                    }
                  );
              } else {
                var body = {
                  email: self.email,
                  message: self.message,
                  name: self.name
                };
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(self.email, self.password)
                  .then(
                    function(user) {
                      if (self.campamb) {
                        firebase
                          .firestore()
                          .collection("campus_ambassadors")
                          .doc(user.user.uid)
                          .set({
                            name: self.name,
                            college: self.college,
                            username: self.username,
                            email: self.email,
                            ucode: uniqueCode,
                            pno: self.pno,
                            wpno: self.wpno,
                            uid: user.user.uid,
                            sameNos: self.phoneNos,
                            referred: false,
                            referralcode: newCode
                          })
                          .catch(function(error) {
                            self.mujerror = error.message;
                          });
                      }
                      firebase
                        .firestore()
                        .collection("users")
                        .doc(user.user.uid)
                        .set({
                          name: self.name,
                          college: self.college,
                          username: self.username,
                          email: self.email,
                          ucode: uniqueCode,
                          pno: self.pno,
                          wpno: self.wpno,
                          uid: user.user.uid,
                          isManipal: self.isManipal,
                          sameNos: self.phoneNos,
                          referred: false,
                          campamb: self.campamb
                        })
                        .then(
                          function() {
                            fetch("/mail/checkMail.php", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json"
                              },
                              body: JSON.stringify(body)
                            })
                              .then(res => {
                                return res.json();
                              })
                              .then(response => {
                                if (response.code === 200) {
                                  self.mujerror = "We'll get back to you!";
                                } else if (response.code === 405) {
                                  self.mujerror = "Fields cant be empty!";
                                } else if (response.code === 406) {
                                  self.mujerror = "Invalid E-Mail";
                                }
                                window.location = "/eventregistrations";
                              });
                          },
                          function(error) {
                            console.log(error.message);
                          }
                        );
                    },
                    function(error) {
                      alert(error.message);
                    }
                  );
              }
            }
            self.disabled = false;
          },
          function(error) {
            alert(error.message);
            self.disabled = true;
          }
        );
    },
    validateManipal() {
      var self = this;
      self.disabled = true;
      if (this.phoneNos) {
        this.wpno = this.pno;
      }
      if (
        this.name == "" ||
        this.regno == "" ||
        this.password == "" ||
        this.repassword == "" ||
        this.username == "" ||
        this.email == "" ||
        this.pno == "" ||
        this.wpno == ""
      ) {
        if (this.name == "") {
          alert("Name empty");
        } else if (this.regno == "") {
          alert("Registration Number empty");
        } else if (this.password == "") {
          alert("Password empty");
        } else if (this.repassword == "") {
          alert("Password again empty");
        } else if (this.username == "") {
          alert("Username empty");
        } else if (this.email == "") {
          alert("Email empty");
        } else if (this.pno == "") {
          alert("Phone Number empty");
        } else {
          alert("Whatsapp Number empty");
        }
        return false;
      }
      if (this.password != this.repassword) {
        alert("Both passwords don't match.");
        return false;
      }
      return true;
    },
    registerManipal() {
      var result = this.validateManipal();
      var uniqueCode = this.random_code();
      var self = this;
      if (!result) {
        return;
      }
      firebase
        .firestore()
        .collection("users")
        .where("username", "==", self.username)
        .get()
        .then(
          function(querySnapshot) {
            if (querySnapshot.size > 0) {
              alert(
                "Username already exists. Please try with another username."
              );
            } else {
              firebase
                .auth()
                .createUserWithEmailAndPassword(self.email, self.password)
                .then(
                  function(user) {
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(user.user.uid)
                      .set({
                        name: self.name,
                        regno: self.regno,
                        username: self.username,
                        email: self.email,
                        isManipal: true,
                        ucode: uniqueCode,
                        pno: self.pno,
                        wpno: self.wpno,
                        sameNos: self.phoneNos
                      })
                      .then(
                        function() {
                          var body = {
                            email: self.email,
                            message: self.message,
                            name: self.name
                          };
                          fetch("/mail/checkMail.php", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json"
                            },
                            body: JSON.stringify(body)
                          })
                            .then(res => {
                              return res.json();
                            })
                            .then(response => {
                              if (response.code === 200) {
                                self.mujerror = "We'll get back to you!";
                              } else if (response.code === 405) {
                                self.mujerror = "Fields cant be empty!";
                              } else if (response.code === 406) {
                                self.mujerror = "Invalid E-Mail";
                              }
                              alert(
                                "Successfully Registered. Click ok to proceed."
                              );
                              window.location = "/eventregistrations";
                            });
                        },
                        function(error) {
                          self.mujerror = error.message;
                        }
                      );
                  },
                  function(error) {
                    self.mujerror = error.message;
                  }
                );
            }
            self.disabled = false;
            // self.clear();
          },
          function(error) {
            console.log(error);
            self.disabled = false;
          }
        );
    },
    clear() {
      this.name = "";
      this.college = "";
      this.email = "";
      this.regno = "";
      this.pno = "";
      this.wpno = "";
      this.password = "";
      this.code = "";
      this.ucode = "";
      self.username = "";
      this.repassword = "";
      this.campamb = "";
      this.isManipal = false;
      this.mujerror = "";
      this.othererror = "";
    }
  }
});
