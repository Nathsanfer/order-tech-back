import prisma from '../prisma/prisma.js'

async function main(){
  try{
    const o = await prisma.order.create({data:{id_user:1, status:'pending', password_panel:'0000', total_cost:0}})
    console.log('created order', o)
  }catch(e){
    console.error('err', e)
  }finally{
    await prisma.$disconnect()
  }
}

main()
