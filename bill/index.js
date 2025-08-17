import React from 'react'
import ReactPDF, { Document, Font, Page,renderToStream ,Text} from '@react-pdf/renderer'
import MyDocument from './Bill'
import minioClient from '@/lib/providers/minio'
import TreewinClient from '../providers/treewin'



async function generateAndSaveBill(data) {
  console.log(process.env.TREEWIN_APP_KEY);
  console.log(process.env.TREEWIN_APP_SECRET);
  const client = new TreewinClient(process.env.TREEWIN_APP_KEY, process.env.TREEWIN_APP_SECRET)
  console.log(data);
  const response = client.createOrder(data)
  console.log(response);
  return 
}

export default generateAndSaveBill
