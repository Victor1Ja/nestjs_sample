import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookmarkDto } from './dto/bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({ where: { userId: userId } });
  }

  createBookmark(userId: number, dto: BookmarkDto) {
    const bookmark = { ...dto, userId: userId };
    this.prisma.bookmark.create({ data: { ...bookmark } });
  }

  getBookmarkById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: { userId: userId, id: bookmarkId },
    });
  }

  editBookmarkById(userId: number, bookmarkId: number, dto: BookmarkDto) {
    try {
      const bookmark = this.prisma.bookmark.findFirst({
        where: { userId: userId, id: bookmarkId },
      });
      if (bookmark === undefined) {
        throw new NotFoundException(' Bookmark not found');
      }

      return this.prisma.bookmark.update({
        where: { id: bookmarkId },
        data: { ...dto },
      });
    } catch (e) {
      throw e;
    }
  }

  deleteBookmarkById(userId: number, bookmarkId: number) {
    try {
      const bookmark = this.prisma.bookmark.findFirst({
        where: { userId: userId, id: bookmarkId },
      });
      if (bookmark === undefined) {
        throw new NotFoundException(' Bookmark not found');
      }

      return this.prisma.bookmark.delete({ where: { id: bookmarkId } });
    } catch (e) {
      throw e;
    }
  }
}
