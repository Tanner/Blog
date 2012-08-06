module Jekyll
	class GenerateNetwork < Generator
		safe true

		def generate(site)
			page = NetworkJS.new(site, site.posts)
			site.pages << page
		end
	end

	class NetworkJS < Page
		def initialize(site, posts)
			@site = site
			@posts = posts.sort.reverse
			@dir = "/js/"
			@name = "network.js"
			
			self.process(@name)

			self.data = {
				'layout' => ""
			}
			
			self.content = "function drawNetwork() {";
			
			self.content << drawPost("test", "asdf", 50, 50);
			
			self.content << "}";
		end
		
		def drawPost(name, link, x, y)			
			content = <<-JAVASCRIPT
$("canvas").drawEllipse({
	fillStyle: "#000",
	x: #{x}, y: #{y},
	width: 50, height: 50
});
			JAVASCRIPT
		end
		
		def render(layouts, site_payload)
			payload = {
				"content" => self.content,
			}.deep_merge(site_payload)
			do_layout(payload, layouts)
		end
	
		def to_liquid
	      self.data.deep_merge({
	                             "url" => self.url,
	                             "content" => self.content
	                           })
	    end
	end
end