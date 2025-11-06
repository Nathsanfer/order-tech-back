const payload = {
  id_user: 1,
  status: "pending",
  password_panel: "1234",
  items: [
    { id_item: 102, quantity: 2 },
    { id_item: 114, quantity: 1 }
  ]
};

async function main(){
  try{
    const res = await fetch('http://localhost:5000/orders/with-items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  }catch(e){
    console.error('request error', e);
  }
}

main();
