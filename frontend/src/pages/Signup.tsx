
import Quotes from '../components/Quotes'
import SignupComp from '../components/SignupComp'

const Signup = () => {
  return (
    <div className=' grid grid-cols-1 md:grid-cols-2'>
      {<SignupComp />}
      {<Quotes />}
    </div>
  )
}

export default Signup
