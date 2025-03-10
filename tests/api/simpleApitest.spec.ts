import { test } from '@playwright/test'
import { Serializable } from 'node:child_process';

type RespBody = {
   headers: { [key: string]: string },
   headersArray: Array<{ name: string, value: string }>,
   ok: boolean,
   status: number,
   statusText: string,
   url: string,
   json: Promise<Serializable>,
   text: string,
   bodyBuffer: Buffer,
   body: any
}

let resHeaders: RespBody['headers']
let resHeadersArray: RespBody['headersArray']
let resOk: RespBody['ok']
let resStatus: RespBody['status']
let resStatusText: RespBody['statusText']
let resUrl: RespBody['url']
let resJson: RespBody['json'] = Promise.resolve({})
let resText: RespBody['text']
let resBodyBuffer: RespBody['bodyBuffer']
let resBody: RespBody['body']

let access_token: string = ''

const endpointUrl = 'https://bankground.apimate.eu'

test('Create user', async ({ request }) => {
   const postRes = await request.post(`${endpointUrl}/users`, {
      data: {
         "first_name": "Test",
         "last_name": "User",
         "email": "john22@doe.cz",
         "password": "asdfghjkl*WSAD",
         "company": "myJourney"
      }
   })

   resBodyBuffer = await postRes.body()

   if (resBodyBuffer && resBodyBuffer.toString().trim()) {
      resBody = JSON.parse(resBodyBuffer.toString())
   }
})

test('Get access token', async ({ request }) => {
   const postRes = await request.post(`${endpointUrl}/token`, {
      form: {
         username: "john22@doe.cz",
         password: "asdfghjkl*WSAD",
         grant_type: "password",
         scope: "",
         client_id: "",
         client_secret: ""
      },
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
         "Accept": "application/json"
      }
   })

   resBodyBuffer = await postRes.body()

   if (resBodyBuffer && resBodyBuffer.toString().trim()) {
      resBody = JSON.parse(resBodyBuffer.toString())
   }

   access_token = resBody.access_token
})

test('Get information about user', async ({ request }) => {
   await test.step('Authroize', async () => {
      const postRes = await request.post(`${endpointUrl}/token`, {
         form: {
            username: "john22@doe.cz",
            password: "asdfghjkl*WSAD",
            grant_type: "password",
            scope: "",
            client_id: "",
            client_secret: ""
         },
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
         }
      })

      resBodyBuffer = await postRes.body()

      if (resBodyBuffer && resBodyBuffer.toString().trim()) {
         resBody = JSON.parse(resBodyBuffer.toString())
      }

      access_token = resBody.access_token
   })

   await test.step('Get information', async () => {
      const getRes = await request.get(`${endpointUrl}/me`, {
         headers: {
            "Authorization": `Bearer ${access_token}`
         }
      })
   
      resBodyBuffer = await getRes.body()
   
      if (resBodyBuffer && resBodyBuffer.toString().trim()) {
         resBody = JSON.parse(resBodyBuffer.toString())
      }
   
      console.log(resBody)
   })

   await test.step('Update Users company name', async () => {
      const postRes = await request.put(`${endpointUrl}/me`, {
         headers: {
            "Authorization": `Bearer ${access_token}`
         },
         data: {
            company: "New Company"
         }
      })
   
      resBodyBuffer = await postRes.body()
   
      if (resBodyBuffer && resBodyBuffer.toString().trim()) {
         resBody = JSON.parse(resBodyBuffer.toString())
      }
   
      console.log(resBody)
   })
})