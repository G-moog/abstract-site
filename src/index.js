class Site {
    constructor() {
        this.boards = [];
    }

    addBoard(newBoard) {
        
        const ExistBoard = this.boards.find((board) => board.name === newBoard.name);
        
        if (ExistBoard) {
            throw new Error('이미 존재하는 게시판입니다.');
        }
        this.boards.push(newBoard);

        newBoard.onSite= true;
    }

    findBoardByName(boardName) {
        const foundBoard = this.boards.find((board) => board.name === boardName);
        
        if(foundBoard===undefined){
            console.log("해당 게시판은 존재하지 않습니다.")
        }



        return foundBoard;
    }
}

class Board {
    constructor(name) {
        if (!name) {
            throw new Error('게시판의 이름이 입력되지 않았습니다.');
        }
        this.name = name;
        this.onSite = false;
        this.articles = [];
    }

    publish(newArticle) {
        if (this.onSite === false) {
            throw new Error('사이트에 추가되지 않은 게시판은 이용할 수 없습니다.');
        }
       
        let id = 1;
        if (this.articles.length !== 0) {
            id = [...this.articles].sort((a, b) => b.id.split('-')[1] - a.id.split('-')[1])[0].id.split('-')[1] * 1 + 1;
        }
        const date = new Date();

        newArticle.id = `${this.name}-${id}`;
        newArticle.createdDate = date.toISOString();
        newArticle.isPublished = true;
        this.articles = [...this.articles, newArticle];
    }

    getAllArticles() {
        return this.articles;
    }
}

class Article {
    constructor(article) {

        if (!article.subject || !article.content || !article.author) {
            throw new Error('기사에 내용이 입력되지 않았습니다.');
        }
        this.subject = article.subject;
        this.content = article.content;
        this.author = article.author;
        this.comments = [];
        this.isPublished = false;
    }

    reply(newComment) {
        if (!this.isPublished) {
            throw new Error('게시판에 추가되지 않은 기사에는 댓글을 달 수 없습니다.');
        }

        // 날짜 형식 YYYY-MM-DDTHH:MM:SS.mmmZ, mmm은 millisecond 단위
        const date = new Date();
        newComment.createdDate = date.toISOString();
        
        this.comments.push(newComment)
    }

    getAllComments() {
        return this.comments;
    }
}

class Comment {
    constructor(comment) {
        if (!comment.content || !comment.author) {
            throw new Error('댓글 내용 혹은 작성자가 입력되지 않았습니다.');
        }
        globalThis.content = comment.content;
        this.author = comment.author;
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};