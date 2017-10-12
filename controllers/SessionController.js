Session.belongsTo(Volunteer)


TodoItem.associate = function(models) {
  TodoItem.belongsTo(models.Todo, {
    foreignKey: 'todoId',
    onDelete: 'CASCADE',
  });

  Todo.associate = function(models) {
  Todo.hasMany(models.TodoItem, {
   foreignKey: 'todoId',
   as: 'todoItems',
  });
 };
