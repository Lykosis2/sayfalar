import TreewinClient from './treewin'

export default new TreewinClient(process.env.TREEWIN_APPKEY, process.env.TREEWIN_APPSECRET)
