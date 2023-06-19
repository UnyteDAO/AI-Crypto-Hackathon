const isOwner = async (address, contract, chain) => {
  try {
    if (address) {
      const response = await fetch(
        `https://notionmanager.ukishima.repl.co/getOwners?address=${contract}&chain=${chain}`
      );
      const result = await response.json();
      return result.ownerAddresses.includes(address.toLowerCase());
    } else {
      return false;
    }
  } catch(error) {
    console.log(error)
    return false;
  }
};

export { isOwner };
