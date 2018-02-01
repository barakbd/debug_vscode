import app from './App'
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.load();
}

const port = process.env.PORT || 3000

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
