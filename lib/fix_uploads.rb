Dir["../_posts/*.markdown"].each do |name|
	puts "Found file #{name}"
	text = File.read(name)
	puts "Modifying #{name}"

	text.gsub!(/http:\/\/www.tanner-smith.com\/wp-content\/uploads\//, "files/")
	
	File.open(name, "w") { |file| file.puts text }

	puts "Done with #{name}"
	puts "-----"
end