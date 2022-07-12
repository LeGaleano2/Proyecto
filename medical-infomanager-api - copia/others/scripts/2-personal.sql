create table personal(
	id_persona int auto_increment,
    nombre_persona varchar(70) not null,
    telefono_persona varchar(9) null,
    email_persona varchar(60) null,
    foto_persona varchar(100) null,
    estado_persona enum('ACT','INA') not null,
    num_consultorio int not null,
    cargo_persona enum('ADM', 'MED', 'REC', 'DSP') not null,
    especialidad_medica enum('Psiquiatría', ' Urólogo', 'Oftalmólogo', 'Pediatra', 'Ortopedista', 'Dermatólogo') null,
    horario_consultorio varchar(100) not null,
    
    primary key(id_persona)
);


insert into personal values(1,'Juan Antonio Peréz',93929020,'juanaperez@gmail.com','foto.png','ACT',1,',MED','Dermatologo','','{monday:true,tuesday:false,friday:true}')
insert into personal values(2,'Orlando Wilfredo Gutierrez',22930201,'owguti@gmail.com','foto.png','ACT',2,'MED','Pediatra','','{monday:true,tuesday:false,friday:true}')