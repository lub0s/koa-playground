import monk from 'monk'

const db = monk('192.168.99.100:27017/test')


export default db
