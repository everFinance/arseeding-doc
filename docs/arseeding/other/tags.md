# Arweave Tags


**What are Tags?**

tags is a field in an Arweave transaction that is an array of {name,value}, where the total length of names and values cannot exceed 2048 bytes.

By customizing the content of this field, you can use the Arweave gateway to be able to retrieve the transaction corresponding to the tags.

Example:

```bash
query {
    transactions(
        tags: {
            name: "App-Name",
            value: "everPay"
        }
    ) {
        edges {
            node {
                id
            }
        }
    }
}
```

In addition to tagging the data you store on Arweave to make it easier to retrieve, tags also enable the Arweave gateway to add data types directly to the HTTP response header by tagging the data type.

The advantage of this is that content receivers such as browsers can know the data type directly from the Content-Type in the Header and render it, such as images, videos, audio, PDFs, etc.

### Content-Type

Content-Type refers to the Content-Type that exists in the web page. It is used to define the type of network file and the encoding of the web page, and to determine in what form and what encoding the browser will read the file. This is often seen The result of a click to some PHP pages is the reason for downloading a file or an image.

The Content-Type header tells the client the content type of what is actually being returned.

Format：
```
Content-Type: text/html
Content-Type: multipart/form-data
```

Example:

Add `{name:Content-Type, value:image/png}` to tags to declare the data type

[https://viewblock.io/arweave/tx/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c](https://viewblock.io/arweave/tx/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c)

<div align="center"><img src="https://arseed.web3infra.dev/3zH1Ai9-qGTi1hhcnE1tYRutczuWgKB5KvLBJSSVatQ" height="60%" width="60%"/></div>

Render images directly in browser through the Arweave gateway link

[https://aioyqbrvucy3pas4ghnccoqupuef64njmdlkotbgad5vu7dt2u.arweave.net/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c](https://aioyqbrvucy3pas4ghnccoqupuef64njmdlkotbgad5vu7dt2u.arweave.net/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c)

Developers should assign the corresponding `Content-Type` based on the type of uploaded files

Types of media formats usually to see are as follows:

- text/html
- text/plain
- text/xml
- image/gif 
- image/jpeg 
- image/png

Media format types starting with application:

- application/xhtml+xml 
- application/xml
- application/atom+xml 
- application/json
- application/pdf
- application/msword 
- application/octet-stream

More about content-type：
https://tool.oschina.net/commons/_contenttype.dea