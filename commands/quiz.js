module.exports.run = async(client, message, args) => {
  const quiz = require('./quiz.json');
  let action = args[0]
  if(!action) {
    const item = quiz[Math.floor(Math.random() * quiz.length)];
    const filter = response => {
      return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };

    message.channel.send(item.question).then(() => {
	    message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
	        	.then(collected => {
	        		message.channel.send(`${collected.first().author} a eu la bonne réponse!`);
	    	   })
	    	   .catch(collected => {
		    	   message.channel.send('Personne n\'a eu la bonne réponse dans le temp imparti.');
 	       	});
    });
  }
  if(action === 'normal') {
    message.delete()
    let nbQuestion = args[1]
    if(!nbQuestion) return message.channel.send('Vous devez donner un nombre de questions')
    let diff = args[2]
    if(!diff) return message.channel.send('Vous devez précisez une difficulté:\nEasy/Medium/Hard/Very-Hard/Impossible')
    if(diff.toLowerCase() === 'easy') {
      var temp = 15000
    } else if(diff.toLowerCase() === 'medium') {
      var temp = 10000
    } else if(diff.toLowerCase() === 'hard') {
      var temp = 5000
    } else if(diff.toLowerCase() === 'very-hard') {
      var temp = 4000
    } else if(diff.toLowerCase() === 'impossible') {
      var temp = 3000
    } else return message.channel.send('Vous devez précisez une difficulté:\nEasy/Medium/Hard/Very-Hard/Impossible')
    const sentM5 = await message.channel.send(`Le quiz de **${nbQuestion}** questions, dans le mode **normal**, dans la difficulter **${diff}** va commencer dans **${temp / 1000}** secondes`)
    var count = 0
    var note = 0
    const intervalObj = setInterval(() => {
      sentM5.edit(`**Ce quiz a commencer, répondez au maximum de questions!**
difficulter: ${diff}
Nombre de Questions: ${nbQuestion}
**Bonne chance!**`)
      const item = quiz[Math.floor(Math.random() * quiz.length)];
      const filter = response => {
        return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase())
      }
      message.channel.send(item.question).then((msg) => {
        message.channel.awaitMessages(filter, {maxMatches:1, time: temp, errors: ['time'] })
          .then(collected => {
            message.channel.send(`${collected.first().author} a eu la bonne réponse!`)
            note++
            msg.delete()
          })
          .catch(async (collected) => {
            const sentM7 = await message.channel.send('Personne n\'a eu la bonne réponse dans le temp imparti.\n**Prochaine question dans 5 secondes**');
            sentM7.delete(3000)
          })
      })
      count++
      if(count === parseInt(nbQuestion)) {
        clearInterval(intervalObj)
        setTimeout(function() {
          message.channel.send(`**${message.author.toString()}**, Votre note est de **${note}/${nbQuestion}**, sur la difficulté: **${diff}**`)
          sentM5.delete()
        }, temp + 1000)
      }
    }, temp + 5000)
  } else return message.channel.send('Vous devez précisez une action.\nIl y a seulement une action disponbile: **<normal>**')
}