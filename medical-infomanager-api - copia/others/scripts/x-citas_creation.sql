create table citas(
	id_cita int auto_increment,
    id_paciente int not null,
    id_medico int not null,
    num_turno int null,
    fecha_agenda date not null,
    fecha_cita date not null,
	estado_cita enum('COM', 'PEN', 'CAN') not null,
    
	primary key (id_cita)
    /*
	constraint fk_id_paciente_pacientes
    foreign key (id_paciente)
    references medical_infomanager.pacientes (id_paciente)
    on delete no action
	on update no action,
    
	constraint fk_id_medico_personal
    foreign key (id_medico)
    references medical_infomanager.personal (id_persona)
    on delete no action
	on update no action*/
)
