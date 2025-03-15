import axios from "axios";

const GlobalGet = (args) => axios({ ...args, method: 'GET' }, { timeout: 5 }).then(res => { return res?.data }).catch(err => { return err?.response?.data })
const GlobalPost = (args) => axios({ ...args, method: 'POST' }, { timeout: 5 }).then(res => { return res?.data }).catch(err => { return err?.response?.data })
const GlobalDelete = (args) => axios({ ...args, method: 'DELETE' }).then(res => { return res?.data }).catch(err => { return err?.response?.data })
const GlobalPut = (args) => axios({ ...args, method: 'PUT' }, { timeout: 10 }).then(res => { return res?.data }).catch(err => { return err?.response?.data })

export { GlobalGet, GlobalDelete, GlobalPost, GlobalPut };