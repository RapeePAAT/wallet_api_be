# wallet_api_be

โดยโปรเเกรมนี้เป็น API ในการจำลองการจัดการเหรียญ cryptocurrency ในการเเลกเปลี่ยนกับ ผู้ใช้งานคนอื่น โดยจะมีอัตตราเเลกเปลี่ยน ระหว่างเหรียญนั้นขึ้นกับ Admin 

เทคโนโลยีที่ใช้ 
Javascripts Nodejs Express , Sequelize , Jwt
ฐานข้อมูล 
Postgres

DataBase Design


![image](https://github.com/RapeePAAT/wallet_api_be/assets/144792043/0d91032f-391b-4473-969c-6871535de2dc)






การเริ่มทำงาน
git clone https://github.com/RapeePAAT/wallet_api_be.git

เข้าไปเเก้ไขไฟล .env.example ให้ เป็น .env เเละทำการเเก้ไข config ต่างก่อนเริ่มทำงาน 

npm i // install package

npm start 

http://localhost:3001/api-docs/#/ #เเนะนำให้ใช้ swgger ของเราได้เลย


![image](https://github.com/RapeePAAT/wallet_api_be/assets/144792043/0f147cb3-defd-4972-9cf1-f69603b6c448)



โดยเมื่อเข้ามาสู้ Swagger ผมเเนะนำให้ สมัครการใช้งานก่อนเเล้วเลือก role เป็น admin *เพราะจะใช้ API ได้ทุกส่วน

  -register // สมัครใช้งาน
  
  -login // เข้าสู่ระบบ ให้นำ accessTokenkey ไปใส่ใน Authorize Button เพื่อเข้าใช้งาน

ต่อมาจะขออธิบายการเริ่มใช้งาน เเนะนำในการ setup ค่าใน Database

register -> login -> create cryptocurrency -> create Digitalassests -> create walllet -> create ExchangeRate

โดยเหตุผลที่ต้อง 
create cryptocurrency => เพื่อให้รู้ว่าในระบบเรามีอะไรเหรียญอะไรบ้าง

create Digitalassests => เพื่อสร้างสินทรัพย์ในระบบเรา เพราะ หาก ผู่ใช้งานทำการเติมเงินเข้ามาใน wallet มันจะทำการหักยอด จาก table Digitalassests ก่อนเเล้วค่อยนำมาเพิ่มให้ผู้ใช้งาน

create walllet => เพิ่มสินทรัพย์ในกระเป๋าของผู้ใช้งาน

create ExchangeRate => เลือก 2 เหรียญ ที่จะนำมาปรับค่าเลท ที่เราต้องการ เช่น BTC/ETH , ETH/BTC *เเนะนำว่าหากสร้างrate ให้ทำทั้ง 2 เเบบ  BTC/ETH =0.05 เเละ ETH/BTC =20 เพื่อให้สะดวกการทำงานของระบบ

create Transaction -> ให้เราเลือก ID ของผู้ใช้งานที่เราต้องการส่ง เเละ เลือกเทรดระหว่าง BTC/ETH , ETH/BTC  *ไม่ต้องห่วงว่าหากผู้ใช้งานปลายทางนั้นไม่มีเหรียญนั้น เเละเลือกยอดเหรียญที่ โดยสามารถดูค่าเพิ่มเติ่มได้ใน Swagger




  

