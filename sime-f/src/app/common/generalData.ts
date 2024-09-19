//crate a dictionary of genere data
export const generalData = {
    gender: [
        { value: 1, label: 'Masculino' },
        { value: 2, label: 'Femenino' },
        { value: 3, label: 'Otro' }
    ],
    civil_status: [
        { value: 1, label: 'Soltero/a' },
        { value: 2, label: 'Casado/a' },
        { value: 3, label: 'Divorciado/a' },
        { value: 4, label: 'Viudo/a' },
    ],
    roles: [
        { value: 1, label: 'Administrador' },
        { value: 2, label: 'Profesor' },
        { value: 3, label: 'Tutor' }
    ]
};

export enum Roles{
    ADMIN = 1,
    TEACHER = 2,
    TUTOR = 3
}
