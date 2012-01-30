desc 'nuke, build and compass'
task :generate do
  sh 'rm -rf _site'
  sh 'time jekyll'
end

desc 'build and run test server'
task :test => [:generate] do
  sh 'jekyll --auto --server'
end

desc 'deploy via rsync'
task :deploy do
  puts 'DEPLOYING!'
  sh "rsync -rtzh --progress --delete _site/ user@domain.com:/var/www/site"
  puts 'DONE!'
end