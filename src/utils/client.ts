import { Client, Databases } from 'appwrite'

const client = new Client()
export const root = client
  .setProject('67448ebe000b0e6a8463')
  .setEndpoint('https://cloud.appwrite.io/v1')

export const databases = new Databases(client)
