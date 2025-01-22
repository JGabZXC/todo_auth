class Todo {
    date = new Date();
    constructor(user_id, user_firstname, description, category) {
        this.user_id = user_id;
        this.user_firstname = user_firstname;
        this.description = description;
        this.category = category;
        this.status = 'Pending';
    }
}

export default Todo;