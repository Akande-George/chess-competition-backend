var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://george:george214@cluster0.dvfh9.mongodb.net/chess?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }, ()=> {
      console.log('connected to DB')
  });