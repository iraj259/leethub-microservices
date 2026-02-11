const marked = require('marked')
const sanitizeHtmlLibrary=require('sanitize-html')
const TurndownService = require('turndown')

function sanitizeMarkdownContent(markdownContent){
    const turndownService = new TurndownService()
    // convert markdown to html
    const convertedHtml = marked.parse(markdownContent)
    console.log('converted html', convertedHtml)
    // sanitize html
    const sanitizedHtml = sanitizeHtmlLibrary(convertedHtml,{
        allowedTags: sanitizeHtmlLibrary.defaults.allowedTags
    })
    console.log('sanitized html', sanitizedHtml)
    // convert the sanitized html back to markdown
    const sanitizeMarkdown= turndownService.turndown(sanitizedHtml)
    console.log("sanitized markdown",sanitizeMarkdown)
    return sanitizeMarkdown
}


module.exports=sanitizeMarkdownContent