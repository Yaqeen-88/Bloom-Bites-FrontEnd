import Bloom from './api'


export const RegisterUser = async (data) => {
  try{
    const res = await Bloom.post('/auth/register', data)
    return res.data
  } catch (error){
    throw error
  }
}


export const SignInUser = async (data) => {
  try{
    const res = await Bloom.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error){
    throw error
  }
}

export const CheckSession = async (data) => {
  try{
    const res = await Bloom.get('/auth/session', data)
    return res.data
  } catch (error){
    throw error
  }
}
