const Database = require('./db.js')
const createProffy = require('./createProffy.js')

Database.then(async (db) => {
    
    // Inserir dados
    proffyValue = {
        name: "Decio Neto", 
        avatar: "https://img-a.udemycdn.com/user/200_H/46461848_3c9d.jpg", 
        whatsapp: "87988374039", 
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
    }

    classValue = {
        subject: "Química", 
        cost: "80"
        //proffy_id will come from database
    }

    classScheduleValues = [
        //class_id  will come from database
        {
            weekday: 2, 
            time_from: 720, 
            time_to: 1220
        },
        {
            weekday: 4, 
            time_from: 920, 
            time_to: 1420
        },
    ]

    await createProffy(db, { proffyValue, classValue, classScheduleValues })

    // Consultar dados inseridos
    // Todos os proffys
    const allProffys = await db.all("SELECT * FROM proffys");
    // console.log(allProffys)

    // Aulas do professor, com os dados do professor
    const allClassesAndProffy = await db.all(`
        SELECT classes.*, proffys.*
        FROM classes
        JOIN proffys ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `);
    // console.log(allClassesAndProffy)

    // O horário que a pessoa trabalha, por exemplo, é das 8h às 18h.
    // Logo, o time_from precisa ser maior ou igual à 8h,
    // e o time_to deve ser menor à 18h.
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.* 
        FROM class_schedule 
        WHERE class_schedule.class_id = 1 
        AND class_schedule.weekday = 2 
        AND class_schedule.time_from <= 1300 
        AND class_schedule.time_to > 1300;
    `);
    // console.log(selectClassesSchedules);
})