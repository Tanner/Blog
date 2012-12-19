module Jekyll
  class ArchiveGenerator < Generator
    safe true

    def group_by_year(posts)
      years = []
      posts_by_year = {}

      posts.reverse.each do |post|
        key = Time.utc(post.date.year)

        if posts_by_year.has_key?(key)
          posts_by_year[key] << post
        else
          posts_by_year[key] = [post]
          years << key
        end
      end

      return [years, posts_by_year]
    end

    def generate(site)
      archive_data = group_by_year(site.posts)

      years = archive_data[0]
      posts_by_year = archive_data[1]

      archives = ArchivePage.new(site, years, posts_by_year)
      archives.render(site.layouts, site.site_payload)
      archives.write(site.dest)

      site.pages << archives
    end
  end

  class ArchivePage < Page
     def initialize(site, years, posts_by_year)
      @site = site
      @base = site.source
      @dir = "/"
      @name = "archive.html"
      
      self.process(@name)
      self.read_yaml(File.join(@base, '_themes', 'network', '_layouts'), 'archive.html')
      # array of Times, normalized to year and month
      self.data['years'] = years
      # hash keyed on normalized times, mapped to array of posts
      self.data['posts_by_year'] = posts_by_year
    end
  end
end