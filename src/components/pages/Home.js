import React from 'react'

const Home = () => {
  return (
    <React.Fragment>
      <div className="container" style={{ height: "100vh"}}>
        <h3 className="text-white">Welcome to Pau Cabral's PokéDex!</h3>
        <br/>
        <p className="text-white">This is a PokéDex site that allow users to view Pokémon and their corresponding information fetched from <b>PokéAPI</b>.</p>
        <br/>
        <p className="text-white">NOTE: This home page, along with other features is still work-in-progress. You may click on the 'ENTRIES' tab to view the list of Pokémon and view their corresponding individual information page.</p>
      </div>
    </React.Fragment>
  )
}

export default Home
