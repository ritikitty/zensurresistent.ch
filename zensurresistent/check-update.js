document.addEventListener('DOMContentLoaded', async () => {
  try {
    const path = window.location.pathname
    const wallet = new SlpWallet(undefined, {
      noUpdate: true,
      interface: 'consumer-api',
    })
    await wallet.walletInfoPromise
    // console.log("wallet info: ", wallet.walletInfo);
    // console.log("BchMessage: ", BchMessage);

    const bchMessage = new BchMessage({ wallet })
    // console.log('bchMessage: ', bchMessage)

    // zensurresistent-ch
    const bchAddr = 'bitcoincash:qzwxs5a4dt0d4l8mg2hg8sgh4s4wuk70pyd9tuj7rn'
    const msg = await bchMessage.memo.memoRead(bchAddr, 'IPFS UPDATE')

    let targetHash = ''
    let hash = ''

    // Loop through all the messages
    for (let i = 0; i < msg.length; i++) {
      const thisMsg = msg[i]
      // console.log(`thisMsg: ${JSON.stringify(thisMsg, null, 2)}`)

      hash = thisMsg.subject
      const sender = thisMsg.sender

      if (sender === bchAddr) {
        if (hash.includes('bafy')) {
          targetHash = hash
          break
        }
      }
    }

    const url = window.location.href
    if (!url.includes(targetHash)) {
      console.log(
        `new version availlable: https://cloudflare-ipfs.com/ipfs/${hash}`
      )
      https: ipfsHashLink = `https://cloudflare-ipfs.com/ipfs/${hash}`
      // https: ipfsHashLink = `https://ipfs.io/ipfs/${hash}`
      document.getElementById(
        'new-version-btn'
      ).href = `https://cloudflare-ipfs.com/ipfs/${hash}`
      document.getElementById('new-version').style.display = 'block'
    } else {
      console.log('You are on the current version :)')
    }
  } catch (err) {
    console.error('Error in web app: ', err)
  }
})
