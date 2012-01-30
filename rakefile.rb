desc 'nuke, build and compass'
task :generate do
  sh 'rm -rf _site'
  jekyll
end

def jekyll
  sh 'time jekyll'
end