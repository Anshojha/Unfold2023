import React from 'react'
import Image from 'next/image'
import Link from "next/link"

const Landing = () => {
  return (
    <div className='landing'>
     <div className='landingOne'>
        <div className='land-head'>
            <h1 className='rhead'>RAISE FUNDS</h1>
            <p className='rfunds'>Nongovernmental, nonsectarian, and not-for-profit,
            Direct Relief relies entirely on private contributions to advance its mission and perform a wide range of functions.
            Included among them are identifying key local providers of health services; 
            working to identify the unmet needs of people in the low-resource areas; mobilizing essential medicines, supplies, and equipment that are requested and appropriate for the circumstances; and managing the many details inherent in storing, transporting, and distributing such resources to organizations in the most efficient manner possible.
            </p>
            <Link href="/raise">
            <button className='bttn'>
            RAISE FUNDS
            </button>
            </Link>
        </div>
        <div>
            <Image className='img' width={400} height={400} src='/undraw_transfer_money_re_6o1h.svg' />
        </div>
     </div>

     <div className='landingOne'>
        <div className='land-head'>
        <div className='imageTwo'>
            <Image className='img' width={400} height={400} src='/undraw_vault_re_s4my.svg' />
        </div>
            
        </div>
        <div className='heading-two'>
        <h1 className='rhead2'>DONATE</h1>
            <p className='rfunds2'>
            This was created to take action to support those already facing the harshest effects of poverty, climate change and ongoing conflict. 
            The pandemic has put them in an even more fragile position, and they shouldn’t have to face this alone.In 191 countries around the world, experienced teams of Red Cross staff and volunteers work alongside communities, listen to what they need, and give them the tools to be able to rebuild their future.
            </p>
            <Link href="/donate">
            <button className='bttn'>
            DONATE FUNDS
            </button>
            </Link>
        </div>
     </div>
    
     <div className='landingOne'>
        <div className='land-head'>
            <h1 className='rhead'>TOKEN</h1>
            <p className='rfunds3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
               sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
               Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
               Excepteur sint occaecat cupidatat non proident, 
               sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
        <div>
            <Image className='img' width={640} height={360} src='/landing_pg.png'/>
        </div>
        <div>
            
        </div>
     </div>
    

    </div>
  )
}

export default Landing