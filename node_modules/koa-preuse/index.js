module.exports = ( app, middleware ) => {
    app.use( middleware );
    app.middleware.unshift( app.middleware.pop() );
};
