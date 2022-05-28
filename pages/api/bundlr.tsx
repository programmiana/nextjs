// import Bundlr from "@bundlr-network/client";
import Arweave from "arweave";

// import { WebBundlr } from "@bundlr-network/client/build/web";
import { WalletConnection, WalletAccount } from "near-api-js";
import { useContext } from "react";
// import { getWallet } from  need to get the wallet address from the connection from NEAR

// export async function getBundlr(wal: WalletConnection) {
//   if (!wal) return;
//   console.log(wal);
//   const bundlr = new WebBundlr("https://node1.bundlr.network", "near", wal);
//   if (bundlr) {
//     await bundlr.ready();
//     return bundlr;
//   }
// }

export async function getArweaveImage(transactionId: string) {
  return new Promise((resolve, reject) => {
    const key = {
      kty: "RSA",
      n:
        "q3NGW2hcXwJLol0qZPmWXXgHqVBj_26tph89lL63ANRfcLgX-Ns9TmsjrUp4e_1cJ_JCaXA6k7Tce09w1wahwx2MDpGdrM3lOf5Q45MhxuorLXpXkzZFMLwgOh_RGoqXv5bh8Jn0jnkoNv_V7aJnvrdwVYtkSx0zq4ur1HRHpBwVpQrUGOq70OfC2-WrozOUtIklCCngt9Uf4K36Vjhnxb9DEAigZ0T2L3BWDmbGV1I38DVHucP4OtV3DrWXv80U1Gu_725epDzEb6Nk2yUhEm_hd_mQKDJqzIgog9M2v48wLGeFz1tdNszs23ajjg8iSDEXKi8xTRucC0Wkwh3oPn-3qQn1XR7mdFQHqW2vtaEV0BnCMMA63-Os-vKkle6bKqMXuEpuO_aow8adpo6eXWFzvQ2bHbZE4Zi_FcmyfvNABrCNyRCx9cqsjCqMFDp9p-lrfWycokFX7XtHqPTuDhA7MpkpXqCA7s5tNwVaUj5mIi4i5FM1eW5yuRlO8kheAas-jexDiISWeLNSQhY60TposU1R1lwtV1goNf2PCVMNSVBAkH_CKU8EOP3Dy_P-NFTUSV4Y0qwuVB_WY-L-kEL3bOub4Eu-xNYr6t2RRiPS_gEgUsYxVGgTryHUTzYb4CY59EYOVMN2OEfhWPlIE0BpJp9TzjmhVUCOEK65ABs",
      e: "AQAB",
      d:
        "L-qLo0hLaJIvqTT4gDfw-jZtjbhV-jFofqEEiOm0I5s3AT2yFW7Qd3YiBnBls-FfPBrMzML83AMUC7JsCuxjkTBU0E2KD52LjuWwnamlKv6PCqrChvYH6FLrftMdkZliR71Xb_LXEmpx_s0JcNyOuhJyZrYKVaPXqP3kDABjdU4UDog0NrKDwyLCpspNadMkoEAkBWAO2dHKkvSMnkQtXGrTx0th6PqxAxkWM_gtPoJP9-YsIZLPcUHvgEDoJEagp61levkRoj0JeVnk-goqcAisruckjtdoWblD-XOyPV87S22zS_xw1Lv5Bmzl0PIR1rNBkhyWXsJ0ngHcxhOtsDTOuzpnWfFDWnkMRYQ1899e9jtpzixZ5RsoTnaIZEI_8Z9RqsQK31D7ps6sWzTMYe4SF0lCwECDtToXjxKru8yNj39M3rruORnCTxZwSj5pY8-RLeGUeyh8NHvRi7tbpsfHKw7-3mTZmymR5QNosApTm19b8o89E9ekXPlwxMJmchC9lKrREbr6zQOvQ1EzLS-040BVojiqFVFTc7EnLarilg2-lHwWoS5JtsiEEUvb0UsaOdx0OQIWwLkQw_vpUmc6n7b9f8yx6eaE6R_4TZG5KINsEOeU6vFte1oYcqRzXE4G0CdHIh8MPnq-Xx1h6l5hP-QW_vl5MqLsfTgKssE",
      p:
        "0oX9_eeU7AbRU66TFCXvwokXeCz8mE8t1mSDMw6SNcMihbTfJaMbw7z8UpVXWLPRimmqBbnkKxVQ42JFk3eu_Zo8-fnQXBzzyPl_vow7a1oLH7rf69lIfXJ54BYgRyz9ECVKCZ5fQn2IKCa6xYhdXtU8jcQ2JbYiKn9tGBsH9Aw_pXePk655alFlFT1d5ObgOjmXCc5d9J86vP6lA3NfjbYmPEgFYfrDQXtxYKLcLUjUskW7fv7ZlCu92KqtUOrSldy-jWANfr0uYwfrhI99iYi2rseA2AZyCSC21X2_RA29YC5Sq9ed_y4uPAyxJdRc4JN6FZH4gGOj_CjM1v6YyQ",
      q:
        "0HyHFS_E1e_3IuqUFCodO-5syZysU6Oqmft1627zwGN3b822yu1n7h0JVej5maknATF4WBQUUdNLML08wLqjV2kgsW3tFFaPD688KAZSl_awEAHwteXkH16lMh14LGSfH_tBwjlacb-kGm-nKv-yTSZB__sjbUr37umPdbCAkG5R8ImWaJp5cBSMkP7SaFyhLjkDRMl8kMEu87V9AnQ8qqtDuSsbxHOFEZM4LhzUfpKG8_b5yo3nj_2gvDhVZOK70tPOKCd9dJe3_PgPKDxaYYGKLcaBfAj4Fgo3bG6JR61nzMRDUDPJhWiOVlfmchpR55VK9gJrxcMHssTdW2Qnww",
      dp:
        "Jw7jC7tufsfZCFyIPyG2tPH4X7yA9MUj7PXi_ZMDf2P_wKzJBdOYMB2c9rlsZjGee76U49EUSwX-ZuFxpSV8WuLF018M0Doy5KOdlr2vvIANNkrWhoxejZ-yiuev_2SSYu94KAaxB8YAf-qHlmRxZknLnUW9AgwjlJzloaZKOHYZTNq80Zp6PkZxqZokFHbdPRA4PIKEHgF4xV29QcGjBci4mVCHZyE-HqUHaPVuQhyUEassWShxN7NR2qP32d5nSZSV6ebbOhthQtBSWtrAYMbzlcO_3NR9TcI7Car11Gt0KicOAYHUd2aa_1sfdrRKswPJj7zwTOmvn_X14yGDOQ",
      dq:
        "S5hLlqgKdBQdhSCPbrxSe0-ZTIUtiuo2Srz95c8GPQUT4osxs2TfoVwP7YGbN1c5GFqqqy0krQKzKcoEBFHoNiKdQxh7tTsphmNgqZaZThaZgkRh1mK0E5fKyGAdGeOmOv9suZL4M3RseVVwxMuQCB9OIRYbo15ihdNUPDUyeKw3s8L_sZAJZlVdHpn3CvZDTzJG-CMiso4Jiz6MRF6HPM76sGJsIBBO-K9r2HSFrBtPKZisvAA2LWSmanj2paz8s5YvEyo2eBcnFGeRf2Ja1y4UP0LR4nqSEdPEguGVj1LV505mpecRM_lUWwRmP4tBlXnxg0AfecacvPpa1O985w",
      qi:
        "lzqo8NwAzfkmqvO2I6kN6EH58YOaovs4mo-UJxKV-HZpjQdbcfOIVZysn1DBtkRYUxBdDbDG3DZAW9Kpkh6xj-Mb9vaRJ3Q_h0PrRIIxp2tEnGOhGrMT8wkJYm2SS02iOgjGrYnoWaG__hl2p1Lm2WlCLNRiJM7kR39wOVKZ1XcP2NsZ1l2DPqH9BPVrebhed60-xBVL9jJnFEggIRMp2WFbYHS6vvbZ5EhkWwpBV-xGQrFyhqA-cQ4xXRZutf_L-gjDb8m4i-X7shiQ7zKIeWqsy8BajrH8nXbCTY92vf7DSSRpgV2-4lTyfzxzRxhB3TW-T-S0O8zwxyiHCII9zA",
    };

    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
    });
    arweave.transactions
      .getData(transactionId, {
        decode: true,
        string: true,
      })
      .then((data) => {
        resolve(data);
        console.log("data: ", data);
      })
      .catch(() => {
        resolve("");
      });
  });
}

export async function uploadImageToArweave(image = "testing") {
  const key = {
    kty: "RSA",
    n:
      "q3NGW2hcXwJLol0qZPmWXXgHqVBj_26tph89lL63ANRfcLgX-Ns9TmsjrUp4e_1cJ_JCaXA6k7Tce09w1wahwx2MDpGdrM3lOf5Q45MhxuorLXpXkzZFMLwgOh_RGoqXv5bh8Jn0jnkoNv_V7aJnvrdwVYtkSx0zq4ur1HRHpBwVpQrUGOq70OfC2-WrozOUtIklCCngt9Uf4K36Vjhnxb9DEAigZ0T2L3BWDmbGV1I38DVHucP4OtV3DrWXv80U1Gu_725epDzEb6Nk2yUhEm_hd_mQKDJqzIgog9M2v48wLGeFz1tdNszs23ajjg8iSDEXKi8xTRucC0Wkwh3oPn-3qQn1XR7mdFQHqW2vtaEV0BnCMMA63-Os-vKkle6bKqMXuEpuO_aow8adpo6eXWFzvQ2bHbZE4Zi_FcmyfvNABrCNyRCx9cqsjCqMFDp9p-lrfWycokFX7XtHqPTuDhA7MpkpXqCA7s5tNwVaUj5mIi4i5FM1eW5yuRlO8kheAas-jexDiISWeLNSQhY60TposU1R1lwtV1goNf2PCVMNSVBAkH_CKU8EOP3Dy_P-NFTUSV4Y0qwuVB_WY-L-kEL3bOub4Eu-xNYr6t2RRiPS_gEgUsYxVGgTryHUTzYb4CY59EYOVMN2OEfhWPlIE0BpJp9TzjmhVUCOEK65ABs",
    e: "AQAB",
    d:
      "L-qLo0hLaJIvqTT4gDfw-jZtjbhV-jFofqEEiOm0I5s3AT2yFW7Qd3YiBnBls-FfPBrMzML83AMUC7JsCuxjkTBU0E2KD52LjuWwnamlKv6PCqrChvYH6FLrftMdkZliR71Xb_LXEmpx_s0JcNyOuhJyZrYKVaPXqP3kDABjdU4UDog0NrKDwyLCpspNadMkoEAkBWAO2dHKkvSMnkQtXGrTx0th6PqxAxkWM_gtPoJP9-YsIZLPcUHvgEDoJEagp61levkRoj0JeVnk-goqcAisruckjtdoWblD-XOyPV87S22zS_xw1Lv5Bmzl0PIR1rNBkhyWXsJ0ngHcxhOtsDTOuzpnWfFDWnkMRYQ1899e9jtpzixZ5RsoTnaIZEI_8Z9RqsQK31D7ps6sWzTMYe4SF0lCwECDtToXjxKru8yNj39M3rruORnCTxZwSj5pY8-RLeGUeyh8NHvRi7tbpsfHKw7-3mTZmymR5QNosApTm19b8o89E9ekXPlwxMJmchC9lKrREbr6zQOvQ1EzLS-040BVojiqFVFTc7EnLarilg2-lHwWoS5JtsiEEUvb0UsaOdx0OQIWwLkQw_vpUmc6n7b9f8yx6eaE6R_4TZG5KINsEOeU6vFte1oYcqRzXE4G0CdHIh8MPnq-Xx1h6l5hP-QW_vl5MqLsfTgKssE",
    p:
      "0oX9_eeU7AbRU66TFCXvwokXeCz8mE8t1mSDMw6SNcMihbTfJaMbw7z8UpVXWLPRimmqBbnkKxVQ42JFk3eu_Zo8-fnQXBzzyPl_vow7a1oLH7rf69lIfXJ54BYgRyz9ECVKCZ5fQn2IKCa6xYhdXtU8jcQ2JbYiKn9tGBsH9Aw_pXePk655alFlFT1d5ObgOjmXCc5d9J86vP6lA3NfjbYmPEgFYfrDQXtxYKLcLUjUskW7fv7ZlCu92KqtUOrSldy-jWANfr0uYwfrhI99iYi2rseA2AZyCSC21X2_RA29YC5Sq9ed_y4uPAyxJdRc4JN6FZH4gGOj_CjM1v6YyQ",
    q:
      "0HyHFS_E1e_3IuqUFCodO-5syZysU6Oqmft1627zwGN3b822yu1n7h0JVej5maknATF4WBQUUdNLML08wLqjV2kgsW3tFFaPD688KAZSl_awEAHwteXkH16lMh14LGSfH_tBwjlacb-kGm-nKv-yTSZB__sjbUr37umPdbCAkG5R8ImWaJp5cBSMkP7SaFyhLjkDRMl8kMEu87V9AnQ8qqtDuSsbxHOFEZM4LhzUfpKG8_b5yo3nj_2gvDhVZOK70tPOKCd9dJe3_PgPKDxaYYGKLcaBfAj4Fgo3bG6JR61nzMRDUDPJhWiOVlfmchpR55VK9gJrxcMHssTdW2Qnww",
    dp:
      "Jw7jC7tufsfZCFyIPyG2tPH4X7yA9MUj7PXi_ZMDf2P_wKzJBdOYMB2c9rlsZjGee76U49EUSwX-ZuFxpSV8WuLF018M0Doy5KOdlr2vvIANNkrWhoxejZ-yiuev_2SSYu94KAaxB8YAf-qHlmRxZknLnUW9AgwjlJzloaZKOHYZTNq80Zp6PkZxqZokFHbdPRA4PIKEHgF4xV29QcGjBci4mVCHZyE-HqUHaPVuQhyUEassWShxN7NR2qP32d5nSZSV6ebbOhthQtBSWtrAYMbzlcO_3NR9TcI7Car11Gt0KicOAYHUd2aa_1sfdrRKswPJj7zwTOmvn_X14yGDOQ",
    dq:
      "S5hLlqgKdBQdhSCPbrxSe0-ZTIUtiuo2Srz95c8GPQUT4osxs2TfoVwP7YGbN1c5GFqqqy0krQKzKcoEBFHoNiKdQxh7tTsphmNgqZaZThaZgkRh1mK0E5fKyGAdGeOmOv9suZL4M3RseVVwxMuQCB9OIRYbo15ihdNUPDUyeKw3s8L_sZAJZlVdHpn3CvZDTzJG-CMiso4Jiz6MRF6HPM76sGJsIBBO-K9r2HSFrBtPKZisvAA2LWSmanj2paz8s5YvEyo2eBcnFGeRf2Ja1y4UP0LR4nqSEdPEguGVj1LV505mpecRM_lUWwRmP4tBlXnxg0AfecacvPpa1O985w",
    qi:
      "lzqo8NwAzfkmqvO2I6kN6EH58YOaovs4mo-UJxKV-HZpjQdbcfOIVZysn1DBtkRYUxBdDbDG3DZAW9Kpkh6xj-Mb9vaRJ3Q_h0PrRIIxp2tEnGOhGrMT8wkJYm2SS02iOgjGrYnoWaG__hl2p1Lm2WlCLNRiJM7kR39wOVKZ1XcP2NsZ1l2DPqH9BPVrebhed60-xBVL9jJnFEggIRMp2WFbYHS6vvbZ5EhkWwpBV-xGQrFyhqA-cQ4xXRZutf_L-gjDb8m4i-X7shiQ7zKIeWqsy8BajrH8nXbCTY92vf7DSSRpgV2-4lTyfzxzRxhB3TW-T-S0O8zwxyiHCII9zA",
  };

  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });

  // FIXME: Upload the actual image here not the image url
  let transaction = await arweave.createTransaction({ data: image });

  transaction.addTag("Content-Type", "image/svg+xml");

  await arweave.transactions.sign(transaction, key);
  let uploader = await arweave.transactions.getUploader(transaction);

  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
    );
  }

  const uri = `https://arweave.net/${transaction.id}?ext=svg`;

  return uri;

  // const bundlr = new WebBundlr("https://node1.bundlr.network", "arweave", key);

  // // await bundlr.utils.getBundlerAddress("near");

  // // await bundlr.ready();
  // console.log("1");
  // const data = "Hello, Bundlr!";

  // const fundStatus = await bundlr.fund(100_000_000);
  // console.log("1.5");
  // const tx = bundlr.createTransaction(data);
  // console.log("2");

  // // get the number of bytes you want to upload
  // const size = tx.size;
  // // query the bundlr node to see the price for that amount
  // const cost = await bundlr.getPrice(size);

  // // sign the transaction
  // await tx.sign();
  // // get the transaction's ID:
  // const id = tx.id;
  // // upload the transaction
  // const result = await tx.upload();
  // console.log(result);

  return true;
  // do bundlr stuff TODO and comment out line above
}

// export const createTx = async (wal, text, tags) => {
//   const bundlr = await getBundlr(wal);
//   const amount = await bundlr?.createTransaction(text, { tags });
//   console.log(amount);
//   console.log("tx created");
// };

// export const fundBundlr = async (bun, size) => {
//   // calculate amount based on size * 10%
//   const total = Math.round(Number(size) * 1.1);

//   const amount = (await bun.getPrice(total)).toString();
//   await bun.fund(amount);
//   await delay(1000); // wait for funding to occur
//   // check balance
//   const balance = (await bun.getLoadedBalance()).toString();
//   if (Number(balance) >= Number(amount)) {
//     return true;
//   }
//   return false;
// };

// function delay(t) {
//   return new Promise(function(resolve) {
//     setTimeout(function() {
//       resolve();
//     }, t);
//   });
// }
