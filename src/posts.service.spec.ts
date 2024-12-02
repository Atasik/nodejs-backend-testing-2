import {Post, PostsService} from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const resPosts: Post[] = [
        {id: '1', text: 'Post 1'},
        {id: '2', text: 'Post 2'},
        {id: '3', text: 'Post 3'},
        {id: '4', text: 'Post 4'},
      ]
      expect(postsService.findMany()).toEqual(resPosts)
    });

    it('should return correct posts for skip and limit options', () => {
      const resPosts: Post[] = [
        {id: '3', text: 'Post 3'},
        {id: '4', text: 'Post 4'},
      ];
      expect(postsService.findMany({ skip: 2, limit: 2 })).toEqual(resPosts);
    });

    it('should return an empty array if skip is greater than the number of posts', () => {
      expect(postsService.findMany({ skip: 5 })).toEqual([]);
    });

    it('should return all posts if limit exceeds the total number of posts', () => {
      const resPosts: Post[] = [
        {id: '1', text: 'Post 1'},
        {id: '2', text: 'Post 2'},
        {id: '3', text: 'Post 3'},
        {id: '4', text: 'Post 4'},
      ];
      expect(postsService.findMany({ limit: 10 })).toEqual(resPosts);
    });
  });
});