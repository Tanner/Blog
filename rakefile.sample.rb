desc 'nuke and build'
task :build do
  sh 'rm -rf _site'
  sh 'time jekyll build'
end

desc 'build and run test server'
task :serve do
  sh 'rm -rf _site'
  sh 'jekyll serve --watch'
end

desc 'deploy via rsync'
task :deploy do
  puts 'DEPLOYING!'
  sh "rsync -rtzh --progress --delete _site/ user@domain.com:/var/www/site"
  puts 'DONE!'
end