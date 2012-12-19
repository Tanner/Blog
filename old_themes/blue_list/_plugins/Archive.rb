module Jekyll
	class ArchiveGenerator < Generator
		safe true

		def generate(site)
			page = ArchivePage.new(site, site.posts)
			site.pages << page
		end
	end

	class ArchivePage < Page
		def initialize(site, posts)
			@site = site
			@posts = posts.sort.reverse
			@dir = "/"
			@name = "archive.html"

			self.process(@name)

			self.data = {
				'layout' => 'default',
				'type' => 'archive',
				'title' => "Archive"
			}

			self.content = "<div id=\"archive\">";
			self.content << "<h1>Archive</h1>";

			currentYear = nil
			currentMonth = nil
			list = false

			@posts.each do |post|
				if (currentYear == nil || currentYear != post.date.year)
					if (list)
						self.content << "</ul>";
					end

					self.content << "<h2>" + post.date.year.to_s + "</h2>";
					currentYear = post.date.year
				end

				if (currentMonth == nil || currentMonth != post.date.month)
					if (list)
						self.content << "</ul>";
					end

					self.content << "<h3>" + Date::MONTHNAMES[post.date.month] + "</h3>";
					self.content << "<ul>";

					list = true
					currentMonth = post.date.month
				end

				self.content << "<li><a href=\"" + site.config["baseurl"] + post.url + "\">" + post.data["title"] + "</a></li>";
			end

			self.content << "</div>";
		end
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