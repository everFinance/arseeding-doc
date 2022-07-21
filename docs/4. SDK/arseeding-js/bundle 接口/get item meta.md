### 通过 itemId 获取 item tx info
```js
import { getItemMeta } from 'arseeding-js'
const arseedingUrl = 'https://arseed.web3infura.io'
const itemId = '<itemId>'
const res = await getItemMeta(arseedingUrl,itemId)

// 返回示例
{
    "signatureType": 1,
    "signature": "D0G5Sm-UWdNyxy-jmFKx7yYF0s0QxtO2THJtZ_duFntdmgfT15aHTU9H2-DENoZ-SdYvgFwH1_1fpTWtxQ6EhWrvSdPV6O--hOFAqdTAF-dH9-Krk_MyCf0YOhaV6JrUDam1j9cKcZGH7Ra-mmo3jdZKUtf9OxPjeZMl5DZCY_N9G9gEnI6nQ2VTVhcb8Yrjo3kalARFhwMU-MOw_vHtVQSv7gfSvabWqUQ5WrsJ7ULPqoY63bKQJ9BjRoq0E1B36upmwHkGRyJ7smLay0YJeRb8DXNUkQJm0Gm9TkQ632m4muWEwdDGpelji9CkqIFQWTLZ7iHPzgMSJivkstPLhDHd5wrK5osPImdGODf8bPmgKwZrWDmxxTByVk8AhOchNuoArEXnAUcaoDGnBWPE6KdHUPPSYoF1elm3kWRmZ-GMgtKEPp9AAPtFQ7ANk-nBQd88QvPsNpipgqIBG6VMMBFxP1GWn2jrlBxY5UIb_8Pc6dCN_t9EoUTsApe5XYsx_S2dCou3WNmEx2GvPfcrdQQmqSrxbmFNaE6-V-7N1oe3AAfd0SJgRKheKmC0vIrzaChQUFEiZb0yutWEUi0au8gAi8LzsmtkFKbGlgf3_w0F_p_x53Ay_qQvrghvC3dkfahmIV9JxaiYPXC0d9kNqBEBGZU0gUw4yL787TRrObo",
    "owner": "rHaWu2SNSRRgl1AFINnNQFeSgjI4ywjsq4Y7Lt3vQ2Fv0qGY5uWIO23hcjavGM1uOjhUwKCok4JfeDwwGqvBvYDWaFFXdeniV1_zrhEmT_jvtAE5tY_hhvHB4Pw6wKXFzAOZMtx5jdbkqvG-UHil-mlkzsKtg6-q187lNRJy08dDtZBIKMJIjPScVUPXBwGW1Vww95Xe05uhWtWpv3SLfqkCE1RlLi9oXoAXtEi0GoPgQK4-wF6zDalyyHZS8mnsvaurCBQfgf795MzJG98K2EnTxYdXrnaWpCpCtEMpdOTrUXFh9wQZMpKaKGYnyIukpkDpSEXBr9faglBdO1pnAiJLXdoocMyPvfZxVeyPbb5YJYxrbc4_w4DW3OlE6Y-dCdBtN_qfhpU33CZ-034MQKYZ89wOrBHRST8STueYaWVvCQzKfJLLZfpdNkfeTCO3unhg6PTzW0sI56R4vEjoio2KxtPyQ3_tC1rTIYlEdA-GnCC4xpODpxYmgvVhD2oQP44QeUXVvkjaWTLBVc-NH3708OcZ8L03aadmn693AlhRP2_i_fns6KU7dmEUc0xfvkYwjvTV4Br4fJ7HZtpvFS8KWTRub_qB25S9ef1lhe0qTA_bb_YSog86G_Ndopl3vQv-xjHWlVSXAX3zBRapNwO3eDRvLlzR2DGMeTb2p3c",
    "target": "",
    "anchor": "",
    "tags": [
    {
        "name": "Content-Type",
        "value": "application/x.arweave-manifest+json"
    }
],
    "data": "",
    "id": "l5WNC__ih6YZLO3WGyUb7L0hcl_vIdTEw3eWOOnnX2Y"
}
```
