import Shop from "../components/shop"
const redeem = () => {
  return (
    <div className="master">
      <div className="donate">
      <div className="title">
        <h1>DONATE FUNDS</h1>
        <p className="don-fun">
        fundraise and donate seamlessly! Set up and manage your fundraiser or donate to different causes from your mobile at anytime and from anywhere
        </p>
      </div>
      <Shop
        object='Suede Sneakers '
        properties='Suede shoes look attractive and how! From boots, sneakers to loafers, theres a lot of options in this category to explore and experiment with. Read on to take a look at our picks. '
        imgUrl="/prod1shoe.png"
        price="30"
      />
      <Shop 
        object='Hyper bass Headphones'
        properties='The compact over-ear is perfect for mobile use and offers real studio performance in any environment: check your recordings directly on the spot and work on your project while you are still travelling home.'
        imgUrl="/prod2shoe.png"
        price="70"
      />
      <Shop 
        object='Sports Shoes'
        properties='Level up your training with this Campus collection. The shoes has full length air unit and adaptive cushioning technology which resists the shoes to D-shape. '
        imgUrl="/prod3.png"
        price="50"
      />
    </div>
    </div>

  )

}

export default redeem
