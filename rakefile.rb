desc 'nuke, build and compass'
task :generate do
  sh 'rm -rf _site'
  sh 'time jekyll'
end

desc 'build and run test server'
task :test => [:generate] do
  sh 'jekyll --auto --server'
end