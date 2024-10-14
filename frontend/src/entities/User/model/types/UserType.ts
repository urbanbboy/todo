export interface UserData {
    _id: string;
    username: string;
    todos: string[];
    createdAt: string;
    updatedAt: string;
}

export interface UserLoginData {
    token: string;
    user: UserData;
    message: string;
}

export interface UserLoginError {
    message: string;
}

export interface UserState {
    userAuthData: UserLoginData | undefined;
    userData: UserData | undefined;
}


// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDY0ZmM0YjQzYTQ2ZWQ4MTUxYjJlOSIsImlhdCI6MTcyODQ2ODkzNiwiZXhwIjoxNzMxMDYwOTM2fQ.Hn6yReFKQfjI_3UkOoudhMlfoHbP8yltGPSOE8Ui62w",
// "user": {
//     "_id": "67064fc4b43a46ed8151b2e9",
//     "username": "user1",
//     "password": "$2a$10$FTmAgMyhqVdAKCEZLXgnrOB1G8m/AaqP8/oqJj9fLqOxEUi.DC2t6",
//     "todos": [
//         "670656b1f8e91b71541e7627",
//         "6706573bf8e91b71541e762d",
//         "67065742f8e91b71541e7631"
//     ],
//     "createdAt": "2024-10-09T09:41:24.268Z",
//     "updatedAt": "2024-10-09T10:13:22.507Z",
//     "__v": 0
// },
// "message": "Вы вошли в систему."

// "user": {
//     "username": "user2",
//     "todos": [],
//     "_id": "67075bb35869aab71445802d"
// },
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDc1YmIzNTg2OWFhYjcxNDQ1ODAyZCIsImlhdCI6MTcyODUzNTQ3NSwiZXhwIjoxNzMxMTI3NDc1fQ.JbtbcDBn6nOmLIP3bxWJRNEZUlyFmMAit85gsbDxLuE",
// "message": "Регистрация прошла успешно."