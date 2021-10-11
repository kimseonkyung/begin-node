const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 100,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// pre: save 함수를 실행하기 전에 처리한다
// next() : save로 넘어간다.
userSchema.pre('save', function (next) {
  var user = this;

  // 비밀번호를 수정하는 경우에만 실행
  if (user.isModified('password')) {
    // 비밀번호를 암호화 시킨다.
    // genSalt: 솔트 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      // hash: 암호화
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword: 1234567   this.password: $2b$10$A6Je71rwSqDX0JZjk6mzeeOvmdr3mQsAh8BmzXhCLj71TW2z48yEK
  // bcrypt.compare: 입력한 비밀번호를 암호화 하여 DB의 비빌번호와 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// 토큰 생성 메서드
userSchema.methods.generateToken = function (cb) {
  var user = this;

  // jsonwebtoken을 이용해서 토큰 생성하기

  // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  // -> user_id + secretToken = token
  // 이후에 secretToken를 이용하여 해석하면 user_id가 나온다.

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  // 토큰을 decode 한다.
  // jwt.verify(token, 'shhhhh', function(err, decoded) {
  //     console.log(decoded.foo) // bar
  // });
  jwt.verify(token, 'secretToken', function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
