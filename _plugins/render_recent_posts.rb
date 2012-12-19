module Jekyll
	class RenderRecentPosts < Liquid::Tag
		def initialize(tag_name, number, tokens)
			super
			@number = number.to_i
		end

		def render(context)
			posts = context.registers[:site].posts

			posts = posts.sort.reverse.first(@number)
			
			output = "<table>";

			posts.each do |post|
				link = context.registers[:site].config['baseurl'] + post.url

				output += "<tr>";
				output += "<td class=\"date\">" + post.date.strftime("%B %e, %Y") + "</td>";
				output += "<td><a href=\"" + link + "\">" + post.data["title"] + "</a></td>";
				output += "</tr>";
			end

			output += "</table>";

			return output
		end
	end
end

Liquid::Template.register_tag('render_recent_posts', Jekyll::RenderRecentPosts)