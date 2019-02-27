const inquirer = require('inquirer')
const makeRecipes = require('./recipes')

const fs = require('fs')
const glob = require('glob')

const questions = [
    {
        type: 'input',
        name: 'appid',
        message: 'Input the appid for HuaweiPush'
    }
]

inquirer.prompt(questions).then(answers => {

    const recipes = makeRecipes(answers)

    Object.keys(recipes).forEach(file => {

        patch(file, [].concat(recipes[file]))

    })

    console.log('done!')
})

function checkPatch(text, patch) {
    return [text, patch]
        .map(x => x.replace(/\s+/g, ' '))
        .reduce((t, p) => t.includes(p))
}


function applyRecipe(text, recipe) {
    if (!text) {
        return text
    }

    if (checkPatch(text, recipe.patch)) {
        return null
    }

    const matched = text.match(recipe.pattern)

    if (!matched) {
        return text
    }

    return text.replace(matched[0], `${matched[0]}${recipe.patch}`)
}

function patch(file, recipes) {

    const path = glob.sync(file, {
        ignore: ['node_modules/**', '**/build/**']
    })[0]

    const init = fs.readFileSync(path, 'utf8')
    const text = recipes.reduce(applyRecipe, init)

    if (text != null) {
        fs.writeFileSync(path, text)
    }
}
