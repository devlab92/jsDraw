document.addEventListener('DOMContentLoaded', () => {
	//Seleciona o elemento CANVAS
	const canvas = document.getElementById('canvas')
	//Permite modificar o canvas (o contexto do canvas)
	const ctx = canvas.getContext('2d')

	//Seta o tamanho das dimensões do canvas
	canvas.width = 500
	canvas.height = 400

	const pen = {
		active: false,
		moving: false,
		pos: {x: 0, y:0 },
		lastPos: null
	}
	// Ativa a função de desenha quando pressiona e segura
	canvas.onmousedown =  (event) => { pen.active = true}
	// Desativa a função de desenha quando solta o botao do mouse
	canvas.onmouseup =  (event) => { pen.active = false}
	// Enquanto estiver se movendo o cursor, será captado a posição do mouse
	canvas.onmousemove =  (event) => {
		pen.pos.x = event.clientX
		pen.pos.y = event.clientY
		pen.moving = true
	}

	const cicle = () => {
		// Se for solicitado pra desenhar, então chama a função desenha
		if(pen.active && pen.moving && pen.lastPos){
			draw({pos: pen.pos, lastPos: pen.lastPos})
			pen.moving = true
		}
		//Passa a ultima posição para a lastPos 
		pen.lastPos = {x: pen.pos.x, y: pen.pos.y}

		// Chama a funçao num intervalo de X ms
		setTimeout(cicle, 1)
	}

	cicle()

	//Função para desenhar no canvas
	const draw = (line) =>{		
		// Indica que vai ser desenhado algo
		ctx.beginPath()
		// Ponto de inicio de onde começa algo
		ctx.moveTo(line.lastPos.x, line.lastPos.y)
		// Direção da linha
		ctx.lineTo(line.pos.x, line.pos.y)
		// Realiza o desenho
		ctx.stroke()
	}
})