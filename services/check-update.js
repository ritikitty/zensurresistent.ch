/*
  This component checks the BCH blockchain for an updated version of the website.
  If the user is looking at the current version of the site, they'll see nothing.
  If the user is viewing an older version of the side, this component component
  will display a link to the latest version.
*/

import Memo from './memo-hash'

// The BCH address broadcasting IPFS hashes when updates are made, using the
// memo.cash protocol.
const ADDR = `bitcoincash:qzwxs5a4dt0d4l8mg2hg8sgh4s4wuk70pyd9tuj7rn`
const memo = new Memo({ bchAddr: ADDR })

const ipfsHashLink = false

async function componentDidMount() {
  console.log('Component check-updates.js mounted.')
  await getUpdatedUrl()
}

async function getUpdatedUrl() {
  try {
    const path = window.location.pathname

    const hash = await memo.findHash()

    if (!hash) {
      console.error(
        `Could not find IPFS hash in transactions for address ${ADDR}`
      )
      return false
    }
    console.log(`latest IPFS hash: ${hash}`)

    // Display the component if the IPFS hash is different from the one in the
    // URL bar.
    const url = window.location.href
    if (!url.includes(hash)) {
      ipfsHashLink = `https://ipfs.io/ipfs/${hash}${path}`
      console.log(`new version availlable: https://ipfs.io/ipfs/${hash}${path}`)
    }
  } catch (err) {
    console.log('Error in getUpdatedUrl(): ', err)
  }
}

// if (this.state.ipfsHashLink) {
//   return (
//     <p style={{ textAlign: 'center', border: 'solid red 5px' }}>
//       <b>
//         Psst! There is a newer version of this page.{' '}
//         <a href={this.state.ipfsHashLink}>Click here</a> to see it.
//       </b>
//     </p>
//   )
// } else {
//   return <></>
// }
