module.exports = function(sequelize, models){

models.Event.create({
    name: '24h de l\'INSA',
    description: 'le festival le plus charismatique de France',
    start_date: new Date('2019/05/17 20:00'),
    end_date: new Date('2019/05/19 23:30')
}).then(()=>{
models.Event.create({
    name: 'Open Air',
    description: 'ça tourne mal',
    start_date: new Date('2019/05/06 12:00'),
    end_date: new Date('2019/05/06 18:00')
}).then(() => {
models.Location.create({
    name: 'Bar AIP',
    description: 'c\'est le bar à coté de l\'AIP',
    gps_lat: 45.783367,
    gps_long: 4.876851
}).then(() => {
models.Location.create({
    name: 'QG catering',
    description: 'là où on stocke les 80 kg de frometon',
    gps_lat: 45.784156,
    gps_long: 4.874421
}).then(() => {
models.Location.create({
    name: 'QG orga',
    description: 'une fois y\'as eu une chèvre',
    gps_lat: 45.783943,
    gps_long: 4.873784
}).then(() => {
models.Specialty.create({
    name: 'TC',
    year: 3
}).then(() => {
models.Specialty.create({
    name: 'TC',
    year: 4
}).then(() => {
models.Specialty.create({
    name: 'TC',
    year: 5
}).then(() => {
models.Specialty.create({
    name: 'Génie Bullshit',
    year: 3
}).then(() => {
models.Specialty.create({
    name: 'Génie Bullshit',
    year: 4
}).then(() => {
models.Specialty.create({
    name: 'Génie Bullshit',
    year: 5
}).then(() => {
models.Specialty.create({
    name: 'IUT',
    year: 1
}).then(() => {
models.Specialty.create({
    name: 'IUT',
    year: 2
}).then(() => {
models.Specialty.create({
    name: 'Arthur',
    year: 23
}).then(() => {
models.Specialty.create({
    name: 'GM',
    year: 22
}).then(() => {
models.User.create({
    first_name: 'Eric',
    last_name: 'Maurincomme',
    surname: 'Momo',
    birthday: new Date('1935/05/15'),
    phone_number: '0160465614',
    email: 'momo@insa-lyon.fr',
    licence_date: null,
    licence_scan_url: null,
    profile_pic_url: null,
    tshirt_size: 'L',
    alcoholic_beverage_consumption: 0,
    food_and_beverage_consumption: 1,
    balance: 4000,
    comment: 'Je retourne vers l\'industrie',
    experience: 'Dirlo d\'l\'INSA',
    incapacity: null,
    specialty_id: 10
}).then(() => {
models.User.create({
    first_name: 'Thibaut',
    last_name: 'Bellanger',
    surname: 'Bigou',
    birthday: new Date('1998/08/06'),
    phone_number: '0645860897',
    email: 't.bellanger34@gmail.com',
    licence_date: new Date('2019/04/10'),
    licence_scan_url: null,
    profile_pic_url: 'profile_pic_1.jpg',
    tshirt_size: 'XL',
    alcoholic_beverage_consumption: 15,
    food_and_beverage_consumption: 35,
    balance: -45,
    comment: 'asso m\'écoeure',
    experience: 'Négociant en fromage, redoublant',
    incapacity: null,
    specialty_id: 1
}).then(() => {
models.User.create({
    first_name: 'Ludovic',
    last_name: 'Giry',
    surname: 'Lulu la tortue',
    birthday: new Date('1996/05/13'),
    phone_number: '0658096140',
    email: 'lc.giry@gmail.com',
    licence_date: new Date('2014/06/26'),
    licence_scan_url: null,
    profile_pic_url: null,
    tshirt_size: 'XS',
    alcoholic_beverage_consumption: 12,
    food_and_beverage_consumption: 22,
    balance: 5,
    comment: 'j\'aimerai dire que... c\'est pas parque j\'ai un crâne moche que je suis moche',
    experience: 'président',
    incapacity: null,
    specialty_id: 3
}).then(() => {
models.User.create({
    first_name: 'Alexis',
    last_name: 'Luzy',
    surname: 'Malynx',
    birthday: new Date('1999/06/06'),
    phone_number: '0761096448',
    email: 'alexisluzy@gmail.com',
    licence_date: null,
    licence_scan_url: null,
    profile_pic_url: null,
    tshirt_size: 'L',
    alcoholic_beverage_consumption: 125,
    food_and_beverage_consumption: 3,
    balance: 55,
    comment: 'jaaaaaaaaaaaune',
    experience: '1  année de Qlture',
    incapacity: 'enorme sexe',
    specialty_id: 7
}).then(() => {
models.Team.create({
    name: 'INSA',
    supervisor_id: 1
}).then(() => {
models.Team.create({
    name: 'Fromage',
    supervisor_id: 2
}).then(() => {
models.Team.create({
    name: 'Plus d\'ordi',
    supervisor_id: 3
}).then(() => {
models.Team.create({
    name: 'jaune',
    supervisor_id: 4
}).then(() => {
models.Equipment_Type.create({
    name: 'Véhicule'
}).then(() => {
models.Equipment_Type.create({
    name: 'Petit matériel'
}).then(() => {
models.Equipment.create({
    name: '12m3',
    description: 'un bien beau camtar',
    quantity: 1,
    pickup_location: 1,
    drop_location: 3,
    equipment_type_id: 1
}).then(() => {
models.Equipment.create({
    name: 'Colson',
    description: 'de biens beaux colliers',
    quantity: 500,
    pickup_location: 3,
    drop_location: 3,
    equipment_type_id: 2
}).then(() => {
models.Equipment.create({
    name: 'Balai',
    description: 'de biens beaux balais',
    quantity: 7,
    pickup_location: 3,
    drop_location: 3,
    equipment_type_id: 2
}).then(() => {
models.Shift_Category.create({
    name: 'C\'est le rush'
}).then(() => {
models.Shift_Category.create({
    name: 'Post Manif'
}).then(() => {
models.Shift.create({
    start_date: new Date('2019/05/19 12:00:00'),
    end_date: new Date('2019/05/19 14:00:00'),
    charisma: 15,
    shift_category_id: 1
}).then(() => {
models.Shift.create({
    start_date: new Date('2019/05/19 20:00:00'),
    end_date: new Date('2019/05/19 22:00:00'),
    charisma: 30,
    shift_category_id: 1
}).then(() => {
models.Shift.create({
    start_date: new Date('2019/05/20 00:00:00'),
    end_date: new Date('2019/05/20 02:00:00'),
    charisma: 15,
    shift_category_id: 2
}).then(() => {
models.Activity.create({
    name: 'Ramener le fromage à la maison',
    description: 'on a acheté bcp bcp (bcp) de fromage et on doit le stocker dans le frigos',
    start_date: new Date('2019/05/11 12:00:00'),
    end_date: new Date('2019/05/11 18:00:00'),
    event_id: 1,
    supervisor_id: 2
}).then(() => {
models.Activity.create({
    name: 'Ranger le QG orga',
    description: 'la manif est fini c\'était bien rigolo mais maintenant au boulot on range tout',
    start_date: new Date('2019/05/19 20:00:00'),
    end_date: new Date('2019/05/20 18:00:00'),
    event_id: 1,
    supervisor_id: 3
}).then(() => {
models.Task.create({
    name: 'Stocker le clackos',
    description: 'on prend la liste de course et on achete ce qu\'il y a marqué',
    start_date: new Date('2019/05/11 12:00:00'),
    end_date: new Date('2019/05/11 14:00:00'),
    supervisor_id: 2,
    team_id: 2,
    location_id: 2,
    activity_id: 1
}).then(() => {
models.Task.create({
    name: 'Acheter le fromedu',
    description: 'on prend le fromage dans le camion et on le met dans les frigos',
    start_date: new Date('2019/05/11 14:00:00'),
    end_date: new Date('2019/05/11 18:00:00'),
    supervisor_id: 2,
    team_id: 2,
    location_id: 2,
    activity_id: 1
}).then(() => {
models.Task.create({
    name: 'Ranger l\'Agora',
    description: 'on range l\'agora',
    start_date: new Date('2019/05/19 20:00:00'),
    end_date: new Date('2019/05/20 16:00:00'),
    supervisor_id: 3,
    team_id: 1,
    location_id: 3,
    activity_id: 2
}).then(() => {
models.Task.create({
    name: 'Ranger la salle dodo',
    description: 'on a pas envie de se faire niquer alors on va la ranger bien proprement',
    start_date: new Date('2019/05/20 06:00:00'),
    end_date: new Date('2019/05/20 08:00:00'),
    supervisor_id: 3,
    team_id: 1,
    location_id: 3,
    activity_id: 2
}).then(() => {
models.CommentObject.create({
    content: 'T\'es sûr qu\'un seul camion ça va suffire ?',
    date: new Date('2019/04/12 13:57:04'),
    user_id: 3,
    activity_id: null,
    task_id: 1
}).then(() => {
models.CommentObject.create({
    content: 'Ouais tkt, j\'en mangerai en sortant du magasin',
    date: new Date('2019/04/13 12:08:56'),
    user_id: 2,
    activity_id: null,
    task_id: 1
}).then(() => {
models.CommentObject.create({
    content: 'Ouais, rangez-moi tout ça avant que je ne parte dans le privé',
    date: new Date('2019/05/17 09:17:56'),
    user_id: 1,
    activity_id: 2,
    task_id: null
}).then(() => {
models.Notification.create({
    content: 'Vous avez un nouveau message.',
    user_id: 3,
    team_id: null
}).then(() => {
models.Notification.create({
    content: 'Vous avez un projet A en attente.',
    user_id: 2,
    team_id: null
}).then(() => {
models.Notification.create({
    content: 'Vous avez des FT à faire les enfants.',
    user_id: null,
    team_id: 1
}).then(() => {

});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});

};