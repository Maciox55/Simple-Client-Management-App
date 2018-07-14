grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
        return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
        cmd: 'grunt',
        grunt: true,
        args: 'nodemon'
    });

    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([
        'clean:server',
        'bowerInstall',
        'concurrent:server',
        'autoprefixer',
        'connect:livereload',
        'watch',
        ]);
});