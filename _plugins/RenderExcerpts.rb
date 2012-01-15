module Jekyll
	class RenderExcerpts < Liquid::Tag
		def render(context)
			date = nil
			excerpts = Hash.new

			context.registers[:site].posts.each do |post|
				if date.nil? or !(date.day == post.date.day and date.month == post.date.month and date.year == post.date.year)
					date = post.date

					if not excerpts.has_key?(date)
						excerpts[date] = Array.new
					end
				end

				excerpts[date] << post
			end
			
			output = ""

			excerpts.each do |date, posts|
				output += "<div class=\"date\">" + date.strftime("%A, %B %d, %Y") + "</div>";

				posts.each do |post|
					title = post.data["title"]
					time = post.date.strftime("%I:%M %p")
					content = excerpt(post.content, 150)

					output += <<HTML
<div class="post-excerpt">
	<div class="header">
		<span class="title">#{title}</span>
		<span class="time">#{time}</span>
	</div>
	<div class="excerpt">#{content}</div>
</div>
HTML
				end
			end

			return output
		end

		def excerpt(string, length)
			string = string.gsub(/<\/?[^>]*>/, "")

			excerpt = string[0..length]

			if string.length > length
				if excerpt[length] == " "
					excerpt.chomp
				end

				excerpt << "&hellip;"
			end

			return excerpt
		end
	end
end

Liquid::Template.register_tag('render_excerpts', Jekyll::RenderExcerpts)